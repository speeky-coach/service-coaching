# Speeky Service Coaching

## Deploy manually to Kubernetes

```
docker build -t brucegroverlee/speeky-service-coaching .
```

```
docker push brucegroverlee/speeky-service-coaching
```

```
cd ./kubernetes
kubectl apply -f deployment.yaml
```
