import HttpService from "../util/HttpService";

export default class UploadAdapter {
    private loader:any;
    private fileReader:FileReader = new FileReader();

    constructor(loader:any) {
        // The file loader instance to use during the upload. It sounds scary but do not
        // worry — the loader will be passed into the adapter later on in this guide.
        this.loader = loader;
    }

    public upload() {
        return this.loader.file.then((file:any) => {
            return new Promise((resolve, reject) => {
                this.fileReader = new FileReader();

                this.fileReader.onload = () => {
                    console.log("file??", this.fileReader.result);
                    HttpService.post("/api/uploads", {
                        data: this.fileReader.result
                    }).then((response) => {
                        console.log("OK ALL DONE", response);
                        return resolve({
                            default: "/api/uploads/" + response._id
                        });
                    }).catch(() => {
                        console.log("OH NO");
                        return reject("oh no");
                    });
                };

                this.fileReader.onerror = (error) => {
                    console.log('Error: ', error);
                };

                this.fileReader.readAsDataURL(file);
            });
        });
    }
}
