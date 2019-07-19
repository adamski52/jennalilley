import Server from "./Server";

(async() => {
    try {
        await new Server().init();
        process.exitCode = 0;
    }
    catch(e) {
        console.error(e);
        process.exitCode = 1;
    }
})();
