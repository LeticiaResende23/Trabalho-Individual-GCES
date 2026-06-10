# Kubernetes deployment

These manifests orchestrate the mk.js production stack:

- `postgres`: stateful database with a persistent volume claim.
- `mkjs-app`: Node.js backend service used by Socket.IO.
- `mkjs-nginx`: Nginx frontend service that serves static files and proxies `/socket.io/`.

Render and inspect the manifests:

```bash
kubectl kustomize k8s
```

Apply them to a cluster:

```bash
kubectl apply -k k8s
```

Check rollout status:

```bash
kubectl -n mkjs rollout status statefulset/postgres
kubectl -n mkjs rollout status deployment/mkjs-app
kubectl -n mkjs rollout status deployment/mkjs-nginx
```

The Nginx service is the public entry point:

```bash
kubectl -n mkjs get service nginx
```
