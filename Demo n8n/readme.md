# n8n Install
1. Installare Docker Desktop 
2. Aprire Windows PowerShell (o altro terminale)
3. Verificare che sia installator Docker CLI tramite il comando `docker --version`
4. Usare il seguente comando per la creazione di un nuovo volume Docker di supporto al container n8n che creeremo in seguito:

```bash
docker volume create n8n_data
```
5. Lanciare il container usando il seguente comando:
```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```
