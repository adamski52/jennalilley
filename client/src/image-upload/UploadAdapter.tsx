export default class UploadAdapter {
    private loader:any;
    private xhr:XMLHttpRequest = new XMLHttpRequest();

    constructor(loader:any) {
        // The file loader instance to use during the upload. It sounds scary but do not
        // worry — the loader will be passed into the adapter later on in this guide.
        this.loader = loader;
    }

    public upload() {
        return this.loader.file.then((file:any) => {
            return new Promise((resolve, reject) => {
                this.initRequest();
                this.initListeners(resolve, reject, file);
                this.sendRequest(file);
            });
        });
    }

    private initRequest() {
        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        this.xhr = new XMLHttpRequest();
        this.xhr.open( 'POST', '/api/image-upload', true );
        this.xhr.responseType = 'json';
    }

    private initListeners(resolve:any, reject:any, file:any) {
        this.xhr.addEventListener('error', () => {
            return reject("something went wrong");
        });

        this.xhr.addEventListener('abort', () => {
            return reject("aborted");
        });

        this.xhr.addEventListener('load', () => {
            const response = this.xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : "something went wrong");
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve({
                default: response.url
            });
        } );

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if (this.xhr.upload) {
            this.xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable ) {
                    this.loader.uploadTotal = evt.total;
                    this.loader.uploaded = evt.loaded;
                }
            });
        }
    }

    private sendRequest(file:any) {
        // Prepare the form data.
        const data = new FormData();

        data.append('upload', file);

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send(data);
    }
}
