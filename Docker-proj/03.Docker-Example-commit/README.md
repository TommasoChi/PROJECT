# Docker Commit Example

## Generare un'immagine da un container

Normalmente il `docker commit` è sconsigliato per scenari di produzione e SDLC, perché crea un'immagine dallo stato di uno specifico container in esecuzione, che dunque può essere stato soggetto ad alterazioni e non risulterà <ins>mai</ins> perfettamente riproducibile. Scrivere un nuovo Dockerfile è la scelta più appropriata poiché esso documenta esattamente <ins>come</ins> l'immagine è stata creata.

Ciò detto, ci sono alcuni casi in cui un `docker commit` può essere utile:

- **Prototipazione / sperimentazione**:
cioè se occorre configurare e testare interattivamente alcune dipendenze, software o proprietà all'interno di un container.<br>
Una volta ultimata la configurazione dell'ambiente, è possibile effettuare un commit per ottenere un'immagine da utilizzare provvisoriamente.<br>
Una volta consolidata l'applicazione, invece, sarà preferibile estrapolare tutte le configurazioni effettuate e scriverle in un Dockerfile, in modo di buildare un'immagine più stabile e riproducibile.

- **Catturare lo stato di un container in esecuzione**:
Nel caso del debugging, potrei voler ricavare lo snapshot di un container sul quale si è verificato un bug, in modo da preservarne lo stato ed indagare senza aver bisogno di riprodurlo.<br>
In scenari di Digital Forensics, è utile per freezare un'applicazione, trasferirla e analizzarla altrove.

- **Ambienti demo o usa-e-getta**: nel caso di utilizzo interno per demo rapide, training o altri scenari in cui la riproducibilità non è rilevante. Il commit in questi casi è una soluzione più efficiente poiché l'immagine può essere costruita in modo progressivo ed interattivo, mentre strutturare un Dockerfile può risultare più complesso.<br>
In rari casi può essere necessario ricorrere al `docker commit` per degli hotfix, ad esempio in scenari di emergenza nei quali non è possibile aggiornare/buildare Dockerfile o reinnescare la pipeline CD/CI, anche se <ins>non</ins> è una best practice.

Riassumendo le regole di adozione:
- Usa `docker commit` per effettuare uno snapshot, fare debugging, o per prototipazione rapida.
- Usa Dockerfile per qualsiasi cosa dovrà essere utilizzata **a lungo termine**, **da più persone** e in **produzione**.


## Esempio di commit per un'immagine ad uso interno

**USE CASE:** Ho bisogno di un container da usare come tool di network discovery e security auditing, ma non trovo immagini già pronte col software necessario.

**IDEA**: inizializzo un'immagine basilare, con solo O.S., installo i tool di cui ho bisogno, poi salvo il container in una nuova immagine riutilizzabile.

1. `docker pull alpine:latest` // Faccio pull dell'immagine base, scegliendo alpine:latest. Alpine è una distro linux estremamente lightweight utilizzata come base per servizi web

2. `docker images` // Verifico che nell'elenco delle immagini Docker figuri anche l'immagine di alpine:latest appena pullata:

```
> docker images
REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
alpine                       latest    4bcff63911fc   2 months ago    12.8MB
```

3. `docker run -t -d --name my_test alpine` // Avvio la mia immagine alpine in un container chiamandolo my_test.

4. `docker exec -it my_test sh` // Apro una shell (sh) in modalità interattiva (-it) all'interno del mio container my_test

5. `apk add nmap nmap-scripts` // Col comando `apk` (Alpine Package Keeper, analogo ad `apt` per Debian/Ubuntu) installo i tool Nmap e all'interno del mio container.

6. `rm -rf /var/cache/apk/* /tmp/nmap*` // Rimuovo i file non necessari. Per avere immagini di dimensioni minime, è buona prassi eliminare ogni cache.

7. `docker commit <container ID> scantools:1.0` // Effettuo il commit del container utilizzando il suo Container ID e specificando nome e tag della nuova immagine

8. `docker image list` // Verifico che la nuova immagine scantools appaia nell'elenco

9. `docker ps -a` // In esecuzione c'è ancora my_test, posso stopparlo e rimuoverlo poiché non ne ho più bisogno
10. `docker stop my_test`
11. `docker container rm my_test` // Rimuovo my_Test, eseguo nuovamente ps -a per verificare che non ci sia più

12. `docker run -t -d --name scantools scantools:1.0` // Avvio la nuova immagine scantools (e lancio nuovamente `docker ps` per verificare che sia running)

13. `docker exec scantools nmap -v -p 20-100 scanme.nmap.org` // Attraverso il container scantools lancio un comando di port scanning, con port range 20-100, verso un host di esempio scanme.nmap.org.<br>
Il container mi restituirà direttamente l'output del comando:

```
Starting Nmap 7.97 ( https://nmap.org ) at 2025-09-27 08:45 +0000
Initiating Parallel DNS resolution of 1 host. at 08:45
Completed Parallel DNS resolution of 1 host. at 08:45, 0.04s elapsed
Initiating Ping Scan at 08:45
Scanning scanme.nmap.org (45.33.32.156) [4 ports]
Completed Ping Scan at 08:45, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 08:45
Completed Parallel DNS resolution of 1 host. at 08:45, 0.50s elapsed
Initiating SYN Stealth Scan at 08:45
Scanning scanme.nmap.org (45.33.32.156) [81 ports]
Discovered open port 22/tcp on 45.33.32.156
Discovered open port 80/tcp on 45.33.32.156
Completed SYN Stealth Scan at 08:45, 2.67s elapsed (81 total ports)
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.041s latency).
Not shown: 79 filtered tcp ports (no-response)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 3.40 seconds
           Raw packets sent: 165 (7.232KB) | Rcvd: 5 (208B)
```

La scansione delle porte ha rilevato le porte 22 ed 80 aperte, con servizi rispettivamente ssh e http.


## Opzionale

- `docker exec -it scantools sh` // Accedo al terminale per utilizzare il tool in modalità interattiva, uso il comando `exit` per uscire dal container e tornare al mio host.

