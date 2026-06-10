# Kubernetes deployment

These manifests orchestrate the mk.js production stack:

- `postgres`: stateful database with a persistent volume claim.
- `mkjs-app`: Node.js backend service used by Socket.IO.
- `mkjs-nginx`: Nginx frontend service that serves static files and proxies `/socket.io/`.
- `mkjs`: Ingress entry point with cert-manager TLS and HTTP to HTTPS redirect.

The cluster must already have an ingress-nginx controller and cert-manager installed.

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

The Ingress is the public entry point and should be exposed by an ingress-nginx controller on ports 80 and 443:

```bash
kubectl -n mkjs get ingress mkjs
```

Internal services stay private inside the cluster:

```bash
kubectl -n mkjs get service app db nginx
```

For local testing, point `mkjs.local` to your ingress controller address.
