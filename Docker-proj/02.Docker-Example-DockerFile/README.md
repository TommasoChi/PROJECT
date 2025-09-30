# Docker file
File che contiene le configurazioni necessarie per la realizzazione di un immagine docker, la quale conterrà il codice sorgente dell'APP ed il contesto necessario per renderla eseguibile (SDK, frameworks, Interpreti, librerie, configurazioni d'ambiente ...)

## Docker image

`docker build -t node-web-app:0.0.1 .`

`docker` -> keyword che specifica da CLI che vogliamo eseguire docker. NB: Affinché Powershell riconosca la keyword, deve essere aggiunto docker come variabile d'ambiente. Questa configurazione è possibile durante l'installazione di docker. 
`build` -> Comando che richiede a docker di costruire l'immagine a partire dal docker file
`esempio-docker-file/node-web-app:0.0.1` -> "nome del docker file" / "Nome dell'immagine" : "Versione"  
`-t` -> Tagga l'immagine con il suo nome
` . `-> Fornisce a docker l'informazione di dove si trova l'immagine. " . " indica che il dockerfile si trova nello stesso path in cui si sta eseguendo il comando.

* Get image list<br>
`docker image list`

* Run container<br>
`docker run -p 8081:8080 -d node-web-app:0.0.1`
 
* Effettuare le modifiche al file
///scommentare

* Build image<br>
`docker build -t node-web-app:0.0.2 .`

* Get image list<br>
`docker image -list`

* Run container<br>
`docker run -p 8082:8080 -d node-web-app:0.0.2`
