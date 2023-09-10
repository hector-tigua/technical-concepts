import { ValidateMongoId ,MongoIdPipe } from "./decorator.pipe";

export class Api {
    
    @ValidateMongoId
    public doSomething(@MongoIdPipe id: string){
        console.log('valid mongo id', id);        
    }
}

const api = new Api();
//api.doSomething('No valid ID');
api.doSomething('610198c6ee57d90011d96c46');