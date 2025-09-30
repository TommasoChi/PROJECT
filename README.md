# Installazione VScode

Aprire https://code.visualstudio.com/download, scaricare l'installer sotto la voce Windows: **"User Installer x64/Arm64"** ed eseguirlo come admin attendendo l'apertura del wizard di installazione. Procedere successivamente con i seguenti step:

1. Accettare il contratto di VSCode, selezionare avanti
2. Assicurarsi di avere flaggato **"add to PATH (requires shell restart)"**, selezionare avanti
3. Procedere con **"Installa"**

## Installazione delle estensioni

Dopo aver aperto VSCode, selezionare nel menù laterale l'icona "Extensions" (CTRL+Shift+X)
Ripetere, per ogni estensione che si desidera installare, la seguente procedura:

1. Cercare il nome dell'estensione nella barra di ricerca laterale
2. Selezionare l'estensione
3. Selezionare installa.

Riavviare VSCode al termine della procedura eseguita per N estensioni

Nell'ambito dell'attività dell'incubeator sono consigliate le seguenti estensioni:
Dev Containers, Containers Tool, Docker, Git Extension Pack, Git History, GitLens, gitignore, Kubernetes, YAML.

# Installazione GIT
@Daniele

## Installazione del software GIT
Aprire https://git-scm.com/downloads/win, scaricare l'installer **"Git for Windows/x64 Setup"**, eseguirlo e premere sempre **avanti** lasciando tutti i default.

Per verificare che l'installazione sia stata effettuata correttamente, aprire un terminale (**cmd** o **powershell**)  e digitare `git` . Se il comando non risulta sconosciuto al sistema, l'installazione è stata effettuata con successo.

## Accesso a GitHub e al repository

1. Visitare https://github.com/ e registrarsi con "SignUp" (cone mail aziendale o personale). 
2. Richiedere a Luca Codastefano abilitazione come contributor per il repository PLAS https://github.com/lucacodastefano-0805/PLASpace.
3. Su Visual Studio Code creare un nuovo progetto clonando l'URL del repository https://github.com/lucacodastefano-0805/PLASpace.git. L'URL è prelevabile anche aprendo il dropdown del bottone verde "<>Code" sulla home page del repository.


## Configurazione GIT e comandi utili

Per impostare *name* ed *email* per la propria utenza, aprire un prompt dei comandi (**cmd** o **powershell**) sul percorso base del progetto e digitare:

```
git config user.name "Mia Rossi"
git config user.email "mia@email.com"
```

**NB**: Il *name* è la stringa che apparirà di fronte ad ogni contributo (commit) sul progetto, ne identifica l'autore.

Se non si prevede di avere altri account o repository da utilizzare con GIT, o se si vuole rendere default questi dati anche per futuri progetti basati su GIT, è possibile assegnare *name* ed *email* sul sistema in uso anche globalmente. In questo caso non è necessario digitare il comando da un percorso specifico:

```
git config --global user.name "Mia Rossi"
git config --global user.email "mia@email.com"
```

La configurazione di GIT è completata.

Anche se l'interfaccia di VisualStudio consente di svolgere con pochi click tutte le operazioni di gestione del progetto e di versioning del codice, è utile conoscere i comandi base per lavorare con GIT:

* `git status` - Fornisce una panoramica delle modifiche apportate nel progetto/folder attuale (branch corrente e modifiche non *staged*).

* `git log` - Elenca l'history delle ultime operazioni effettuate sul branch corrente (si esce premendo `q`).

* `git pull` - Aggiorna la copia locale del proprio branch con le modifiche più recenti reperibili sull'*origin*, effettuando *merge* di eventuali *commit* remoti non conflittuali con la versione locale.

* `git add [nome_file]` - Aggiunge il file alle modifiche *staged for commit*, cioè che verranno incluse nel prossimo commit.

* `git diff` - Restituisce le variazioni di codice ancora non *staged for commit*.

* `git commit -m "[messaggio]"` - Effettua un commit (un pacchetto con un messaggio descrittivo) con le modifiche *staged* finora. Dettagliare un messaggio esaustivo: non "Varie".

* `git push` - Invia i commit ed i merge apportati localmente al branch corrente al medesimo branch del server remoto.

* `git branch` - Indica il branch corrente.

* `git branch -l` - Elenca i branch conosciuti.

* `git gb` - Esegue il garbage collector di GIT, ottimizzando lo spazio disco locale occupato dal repository (non ha ripercussioni sul remote repo).


# Installazione Docker
Aprire https://www.docker.com, scaricare l'installer **"Download for Windows - AMD64"** ed eseguirlo come admin attendendo l'apertura del wizard di installazione. 

Seguire gli step richiesti dal wizard, mantenendo le opzioni di default, assicurandosi che in uno dei passaggi docker risulti configurato variabile d'ambiente (Flag selezionato). 


Per verificare che l'installazione sia stata effettuata correttamente, aprire un terminale (**cmd** o **powershell**)  e digitare `docker` . 

Se il comando restituisce un output che identifica la presenza di docker nel sistema (Es. A self-sufficient runtime for containers) ed un helper costituito da una lista di comandi, l'installazione è avvenuta con successo. 


# Installazione K8s (Minikube)
Dopo aver avviato Docker (Attenzione alle porte) eseguire 
* `winget install Kubernetes.minikube` - Download software
* `minikube start --driver=docker` - esecuzione minikube se ci sono problemi https://minikube.sigs.k8s.io/docs/drivers/docker/
* `minikube addons list` - verifica dei diversi addon disponibili ed attivi 
* `kubectl get po -A` - Deployment disponibili

# Installazione n8n (su Docker)
@Angelo
