import createApp from './app';

const port: number = 3000;

const app = createApp();
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});