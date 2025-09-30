Negli ultimi anni lo sviluppo e la distribuzione del software è cambiato radicalmente:
le applicazioni moderne devono essere scalabili, portabili e facilmente distribuibili, affinché sia possibile adottare metodologie di sviluppo come Continuos Integration/Continuos Development (CI/CD), che semplificano, accelerano e riducono errori nel Software development LifeCycle (SDLC). In questo contesto nasce la containerizzazione, una tecnologia che permette di racchiudere un’applicazione e tutte le sue dipendenze in un “contenitore” leggero e isolato.

# Cos'è la containerizzazione
La containerizzazione è il processo di impacchettamento di un'applicazione software, insieme a tutte le sue dipendenze (librerie, framework, file di configurazione), in un'unità isolata chiamata container.<br>
Questo container può essere eseguito in modo coerente e affidabile su qualsiasi infrastruttura, che sia un server privato, un ambiente cloud o un laptop. I principali vantaggi includono portabilità, velocità, efficienza, semplicità di deployment e scalabilità, rendendola una tecnologia fondamentale per le moderne applicazioni cloud-native. 

## Cos’è l’isolamento?
In informatica, isolare significa separare l’esecuzione di un processo o applicazione dagli altri. Ogni applicazione crede di essere l’unica ad avere accesso alle risorse (CPU, memoria, rete, filesystem). Serve a garantire sicurezza, stabilità e riproducibilità.

## Da Bare Metal e Virtual Machine a container @dpaoletti

### BARE METAL
Le applicazioni vengono eseguite direttamente all'interno dell'infrastruttura host (server, PC) utilizzando il suo Sistema Operativo e le sue risorse fisiche.
Sono tutti locali ed appartenenti allo stesso sistema host:
   - CPU (physical CPU)
   - RAM, porte e file system
   - librerie e file di configurazione
   - processi e indirizzi di memoria
   - servizi e timer di sistema (web server, crontab)
   - percorsi di file e cartelle

Le applicazioni vengono eseguite "closest to the metal", non esistono meccanismi di virtualizzazione e di orchestrazione, dunque sono assenti overhead nell'impiego di risorse: vengono occupate esclusivamente quelle richieste dall'applicazione stessa.<br>
Anche le metriche di performance possono essere misurate facilmente, essendo rilevabili a livello hardware.<br>

### VIRTUAL MACHINE
Le Macchine Virtuali (VM) racchiudono l’applicazione, le librerie o i file binary necessari, i file di configurazione e il Sistema Operativo guest completo.<br>
Una VM viene eseguita da un sistema host detto hypervisor (ad es. VMware, Hyper-V) e può essere trasfertita su altri host come un elemento unico.<br>
L'hypervisor si occupa di virtualizzare le risorse fisiche dell'host (CPU, RAM, disk) e di mostrarle al sistema operativo guest in maniera isolata (vCPU, vRAM, virtual disk). Talvolta questa gestione può portare anche alla sovrallocazione di risorse, confidando sul fatto che è improbabile che tutte le VM sullo stesso sistema host utilizzino simultaneamente le rispettive risorse al 100%.<br>
Tale architettura causa un overhead nell'utilizzo delle risorse fisiche di circa il 5–15% e richiede l'adozione di metriche ad-hoc per monitorare le performance delle applicazioni: ad es. il *vCPU usage* od il *CPU ready time*. Il CPU ready time è il tempo di attesa di un processo virtuale che utilizza vCPU per avere a disposizione cicli di calcolo della CPU fisica (0-50ms sono raccomandati, <300ms sono accettabili, >500ms sono problematici).
Nelle VM le seguenti risorse sono virtualizzate, cioè vengono rimappate ed isolate dall'hypervisor su risorse fisiche del sistema host:
   - CPU (vCPU)
   - RAM (vRAM), porte e file system
   - librerie e file di configurazione
   - processi e indirizzi di memoria
   - servizi e timer di sistema (web server, crontab)
   - percorsi di file e cartelle

### CONTAINER
I container includono l'applicazione e tutte le relative dipendenze. Condividono il kernel del sistema operativo con altri contenitori, in esecuzione come processi isolati nello spazio utente nel sistema operativo host.

<img width="1830" height="674" alt="image" src="https://github.com/user-attachments/assets/dcc4b1e3-8e94-4fb2-8579-9963177a62d0" />

I sistemi di containerizzazione non sono virtualizzatori, ma  middleware software che permettono di minimizzare l’utilizzo di risorse e velocizzano la distribuzione delle applicazioni (Flessibilità).

## Containerizzazione vs Virtualizzazione
La differenza principale tra i due concetti è nella tecnologia che isola l'esecuzione dei processi tra differenti unità dello stesso tipo (containerizzate o virtualizzate) su un sistema fisico. 

Virtualizzare vuol dire allocare risorse per costituire un sistema virtuale su cui far girare i processi, che necessita di una serie di elementi propri di un sistema, come un'instanza del sistema operativo (generante overhead).

Containerizzare vuol dire sfruttare una serie di policy e configurazioni messe a disposizione dal sistema operativo per isolare l'esecuzione di differenti processi. 
In questo caso non abbiamo bisogno di replicare un'istanza del sistema operativo per ogni unità e di conseguenza:

- L'overhead generato sarà minore.
- Si possono frazionare le risorse computazionali con più granularità (non avendo necessità di una dimensione minima per gestire un'istanza del S.O. Un'istanza del S.O. + docker gestisce N Container) 

## Vantaggi della containerizzazione:

- **Leggerezza**: condividono il kernel dell’host → avvio rapido (secondi) e basso consumo di risorse
- **Portabilità**: un container funziona uguale su PC, server, cloud (se c’è Docker o un runtime compatibile)
- **Scalabilità**: facili da replicare e orchestrare con strumenti di orchestrazione
- **Consistenza**: elimina il problema “funzionava sul mio computer”, perché il container contiene tutte le dipendenze
- **Isolamento**: un container non influenza gli altri, crash o conflitti di librerie sono confinati
- **Automazione DevOps**: perfetti per pipeline CI/CD, microservizi e approcci cloud-native

## Svantaggi della conteinerizzazione:

- **Sicurezza relativa**: condividendo il kernel, se viene compromesso un container vi è rischio anche per l’host (è infatti raccomandato l'utilizzo di utenze non-root nel container)
- **Persistenza dei dati**: i container sono effimeri; serve gestire volumi e storage esterni.
- **Gestione complessa in larga scala**: con decine/centinaia di container serve un orchestratore (es. Kubernetes), con aumento della complessità.
- **Overhead di networking**: la virtualizzazione di rete può introdurre latenze.
- **Non sempre adatti a tutto**: applicazioni che richiedono forti legami con l’hardware o sistemi legacy possono non integrarsi bene.

# Architettura dei Container 
I concetti base che caratterizzano le architetture a container sono: **Registry**, **Immagini (Image)** e **Container**.

## Image Registry

Un Registry è un archivio dove si archiviano e distribuiscono le immagini, ovvero pacchetti che contengono tutto il necessario per far partire un container (codice, librerie e configurazioni). Funziona come un “repository” centralizzato (pubblico o privato) e permette di condividere e distribuire le immagini in modo standardizzato e sicuro.

Docker Hub (https://hub.docker.com) è il registry pubblico più conosciuto e usato, gestito da Docker Inc. Offre immagini ufficiali, repository sia pubblici che privati, e funzioni come l’integrazione con GitHub, la scansione per vulnerabilità e la build automatica.

Si possono utilizzare o strutturare registry alternativi, privati aziendali o su cloud provider: Azure Container Registry, AWS ECR, GCP Container Registry, Harbor.

Si possono inoltre utilizzare tecniche di caching per ridurre il traffico verso un registry remoto, migliorare le performance del proprio orchestratore ed evitare di ripetere il download di immagini già utilizzate. Ad esempio se si hanno più istanze di Docker in esecuzione presso la propria infrastruttura (svil, coll, prod), è possibile utilizzare un registry proprio configurato come mirror di quello remoto, facendo puntare ad esso le richieste di pull da parte di tutte le diverse istanze Docker collocate nella propria infrastruttura.

## Immagine (Image)
È il blueprint immutabile dell’applicazione. Contiene tutto ciò che serve per farla funzionare: codice, librerie, runtime, configurazioni.
Si costruisce tipicamente da un file di istruzioni chiamato Dockerfile. La stessa immagine viene deployata nei diversi ambienti (dev, test, prod), garantendo coerenza tra di essi. Un'immagine può essere creata partendo da altre immagini (`docker build`) o "scaricata" (`docker pull`).

*...spiegazione della stratificazione di immagini (ad es. debian->apache->php o alpine->perl->nginx)*

### Pull image

Una volta identificati il registry di riferimento e l'immagine da utilizzare, è possibile effettuare un pull dell'immagine per scaricarla sulla propria istanza Docker in uso.

*...scelta dell'immagine*

<img width="1536" height="786" alt="image" src="https://github.com/user-attachments/assets/3bf0dd41-ac52-41a0-97f0-6ff30a757323" />

[esempio di Pull image](./01.Docker-Example-image/README.md)

### Build image 
Un'immagine Docker è composta da molti Layer ed include tutto il necessario per configurare il nostro container, la particolarità di un immagine è che tutti i layer che contine sono read-only e di conseguenza anche l’immagine stessa è read-only. In questo modo è possibile lanciare l’immagine più volte creando sempre lo stesso contenitore. Solo quando il contenitore viene creato, verrà inserito un sottile layer scrivibile in cima ai Layer esistenti nell’immagine, e preparato per eseguire il main process command (CMD e/o ENTRYPOINT). Questo ultimo Layer scrivibile conterrà le eventuali modifica fatte quando il Container è in esecuzione, ma non intaccheranno l’Immagine originale sottostante. Quando il contenitore verrà eliminato questo sottile Layer scrivibile viene rimosso (non quando viene stoppato o messo in pausa).

<img width="1469" height="604" alt="image" src="https://github.com/user-attachments/assets/112fa83f-bf11-49de-90c1-542257d460a8" />

[esempio di Build image](./02.Docker-Example-DockerFile/README.md)

### Image commit 
*...come da un container è possibile generare un immagine*


## Container
È l’istanza in esecuzione di un’immagine. Quando si avvia un’immagine (`docker run`), questa diventa un container, con un filesystem isolato, processi separati e la propria configurazione di rete. Un container è effimero: può essere creato, fermato, eliminato e ricreato rapidamente perdendo il suo stato.

### Stati di un container

<img width="1129" height="575" alt="image" src="https://github.com/user-attachments/assets/43d52ba7-d4bc-45e3-b0b7-8f127479fe5e" />

* **Stato Created**: questo è il primo stato del ciclo di vita di un container  e si verifica dopo la creazione di un'immagine utilizzando il commando docker create, viene creato un sottile layer scrivibile  sull'immagine specificata e preparato per eseguire il main process command (CMD e/o ENTRYPOINT). NOTA: in questo stato il contenitore viene creato ma non avviato!

* **Stato Running**: questo è lo stato in cui il container è effettivamente in esecuzione. Un container creato usando docker create o interrotto, può essere riavviato usando docker start. Analogamente è possibile fermarlo usando docker stop / docker pause.

* **Stato Paused**: un container in esecuzione può essere messo in pausa utilizzando il comando docker pause. Ciò ha l'effetto di sospendere (o bloccare) tutti i processi nel container specificato. Quando è in pausa, lo stato del container rimane intatto: sia la parte del disco (file system) che la parte di memoria (ram).

* **Stato Stopped**: un container arrestato non ha processi in esecuzione. Quando viene arrestato utilizzando il comando docker stop, la parte del disco viene mantenuta, ma a differenza di quando è in pausa, la parte di memoria viene cancellata. Questa è la differenza principale tra gli stati in pausa e interrotto!

* **Stato Deleted**: un contenitore che si trova nello stato creato o interrotto (Paused, Stopped) può essere rimosso con docker rm. Ciò comporterà la rimozione di tutti i dati associati al contenitore come i processi, il file system, il volume e le mappature di rete, ecc.

:information_source: *Differenze tra **Docker Paused** e **Docker Stopped**:* Quando un container è in pausa, lo stato del contenitore rimane intatto, sia la parte del disco che la parte di memoria. Quando viene arrestato, la parte del disco viene mantenuta al contrario della parte di memoria viene cancellata.

:information_source: *Differenze tra **Docker Stop** e **Docker Kill**:* Quando si lancia il comando Docker Kill, il segnale SIGKILL viene inviato direttamente al processo del container (comportamento predefinito). La differenza tra docker stop e docker kill è che stop consente una terminazione sicura (entro il periodo di grazia) mentre kill lo termina immediatamente.