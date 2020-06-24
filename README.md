# HTML PDF Renderer Service
A very basic service which contains the following:
1. Chrome Headless
2. ExpressJS

Bundled in a Docker image which can easily be built & started with:
```bash
docker build -t pdf-renderer .
docker run --rm -it -p 3000:3000 -v $(pwd):/app --name pdf-renderer pdf-renderer npm run dev
```

If you need more than the basic functionality of passing a URL parameter to the
service, you should fork it and make it your own.