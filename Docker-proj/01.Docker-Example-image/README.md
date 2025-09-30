# Hub e Repo

## Image pull

Il comando `docker pull` consente di scaricare sulla propria istanza Docker l'immagine di un'applicazione esistente. L'immagine è tipicamente hostata presso un Registry di immagini, dove vengono versionate e taggate (ad es. `:1.29`, `1.29-alpine-perl` o `:latest`) tutte le release disponibili.<br>
Di default Docker cerca immagini sul suo registry https://hub.docker.com, ma possono essere configurati anche altri registry alternativi, anche nella propria organizzazione.

Volendo deployare su Docker ad esempio un web-server **Nginx**, si può scegliere la versione più appropriata del software in base alle proprie esigenze tramite una ricerca sui **tag** disponibili, mostrati nella pagina principale di Nginx del registry Docker Hub: https://hub.docker.com/_/nginx

Alcuni comandi di esempio per fare pull di un'immagine nginx in base al tag:

`docker pull nginx:1.29` // preleva dal registry la versione Nginx 1.29

`docker pull nginx:1.29-alpine-perl` // preleva dal registry la versione Nginx 1.29 basta su Alpine e Perl

`docker pull nginx:stable` // preleva dal registry la più recente versione Nginx considerata stabile

`docker pull nginx:latest` // preleva dal registry la più recente versione Nginx affidabile

`docker pull nginx:nightly` // preleva dal registry la più recente versione possibile di Nginx, la "nightly build"

`docker pull public.ecr.aws/nginx/nginx:1.29` // preleva la versione Nginx 1.29 dal Registry Amazon ECR (Elastic Container Registry)



## Elenco delle immagini

Il comando `docker image list` elenca le immagini disponibili localmente sulla propria istanza Docker, fornendo informazioni relative al Registry di provenienza, il tag, la data di creazione e la dimensione:

```
REPOSITORY                   TAG       IMAGE ID       CREATED        SIZE
public.ecr.aws/nginx/nginx   1.29      a0729b9c5b18   4 weeks ago    280MB
nginx                        latest    d5f28ef21aab   2 weeks ago   44.1MB
```

## Rimozione di immagini

`docker image rm <image name:tag>` // Rimuove un'immagine dal proprio Docker utilizzando nome e tag dell'immagine come parametri identificativi.<br>
`docker image rm <image id>` // Rimuove un'immagine dal proprio Docker utilizzando l'image ID come parametro identificativo.

## Build di un'immagine

### Build immagine da filesystem

`docker build <percorso dockerfile> -t <image name:tag>`<br>
Builda un'immagine Docker partendo dal Dockerfile individuato nel percorso indicato e tagga l'immagine, ad esempio:<br>
`docker build . -t mywebapp:1.0`

### Build immagine da archivio

`docker build < archive.tar.gz`<br>
Builda un'immagine Docker utilizzando il Dockerfile presente nel file compresso archivio.tar.gz. Senza specificare ulteriori parametri, viene utilizzato il Dockerfile all'interno del percorso base dell'archivio.

### Build immagine da repository GIT

`docker build https://urlrepo.git#<nome branch>:<percorso dockerfile>`<br>
Builda un'immagine Docker partendo dal Dockerfile individuato all'interno della folder `<percorso dockerfile>` del repository GIT indicato, clonando il branch `<nome branch>`. Senza specificare i parametri `#branch` e `:path`, viene clonato il repository al commit più recente e sul branch di default.<br>
Ad esempio:<br>
`docker build https://github.com/nginx/docker-nginx.git#master:stable/alpine-perl`


## Eseguire un container da un'immagine

`docker run -d --name Nginx-container -p 8080:80 nginx:latest`<br>
Avvia un container in detatched mode (-d), lo nomina *Nginx-container* (--name), mappa la porta *80* del container sulla porta *8080* del proprio host (-p), utilizzando l'immagine *nginx:latest*

## Testare che un container sia in esecuzione

Visitare il web server esposto dal container sulla porta 8080 del proprio host (computer): `http://localhost:8080/`

## Start & Stop di container

`docker start <container id or name>`

`docker stop <container id or name>`

`docker restart <container id or name>`

## Elenco dei container

`docker ps` // Elenco dei container in esecuzione sulla propria istanza Docker

`docker ps -a` // Elenco di tutti i container sulla propria istanza Docker

## Log dei container

`docker logs <container id or name>`

## Eseguire comandi all'interno dei container

`docker exec <container id or name> <command> -c <args>` // Esegue un comando all'interno del container

`docker exec -it <container id or name> sh` // Apre una shell interattiva all'interno del container

## Gestione dei volumi

`docker volume list` // Elenca i volumi già creati

`docker volume create <nome volume>` // Crea un nuovo volume

`docker volume rm <nome volume>` // Elimina il volume

`docker volume prune -a` // Elimina tutti i volumi non utilizzati