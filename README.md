# hacker-news-node-ts-serverless

hacker-news-node-ts-serverless

documentation: <https://documenter.getpostman.com/view/3827865/TVYF7yEq>

api url: <https://p2refkuv3e.execute-api.ap-southeast-1.amazonaws.com/prod/>

## Requirement

- install yarn
- install node (v14+)
- install serverless

## Testing and run

```zsh
// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// lint code
$ yarn run lint

// format code
$ yarn run format

// run test case
$ yarn run test

// remove serverless services in aws (api gateway, lambda, s3, cloudformation)
$ yarn run remove
```
