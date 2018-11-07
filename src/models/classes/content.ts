
export class Content {
    url: string;
    param?: string | number;
    callback: Function;

    constructor(url,callback, param?){
        this.url = url;
        if(param){
            this.param = param;
        }        
        this.callback = callback;                
    }

    getContent(){        
        let callback  = this.callback;
        let param = this.param;
        $.ajax(
            {
                url: this.url,
                type: 'GET',
                dataType: 'text',
                success: function (this, response) {
                    $("#viewContent").html(response);                                    
                    if(param) {
                        callback(param);
                    }else {
                        callback();
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            }
        );
    }

}