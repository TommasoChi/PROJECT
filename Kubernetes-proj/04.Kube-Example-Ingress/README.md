### abilitare gli addons per la gestione deigli ingress
- minikube addons enable ingress-dns
- minikube addons enable ingress
- minikube addons list
### Applicare il service ClusteIp (rimuovere preventivamente i vecchi servizi)
kubectl apply -f service-ClusterIp-web-app-dev.yaml
kubectl get svc -n web-app-dev
### Applicare l'ingress
- kubectl apply -f .\ingress-web-app-dev.yaml 
### verificare l'ingress
- kubectl get ingress -n web-app-dev
### Port forword in modo da non andare sulla porta 80
- kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8080:80
### Verificare il corretto raggiungibilità
- http://127.0.0.1:8080/web-app/
