# GRPC Proto Service
![ScreenShot](/.assets/proto-service.png)


## helper/loadProto.js
Dependent services are defined in array.

```js
//required proto files list
const protos = [
  { name: "authService" },
  { name: "logService" },
];
```

### .env | PROTO_UNUSED_DELETE
Delete non-dependent proto files

### .env | PROTO_UPDATE
Extract dependent proto files

## Working logic

- Proto files are defined to the proto service.
- Other services define their dependent services in **helper/loadProto.js**
- When the service runs, it communicates with the proto service.
- It receives and saves the proto files and host information of the services it is connected to.
- This cycle continues every time the application starts. Only updated proto files are re-registered. 