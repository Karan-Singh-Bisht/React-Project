//This is a template which will always remain same.

import config from "../config/config";  //this is the one with all the env files.
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client      //this only works inside Objects and normal functions.
           .setEndpoint(config.appwriteUrl)//Methods are functions stored as object value.
           .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount ({email, password,name}){   //createAccount is a method.
        try{
            const userAccount = await this.account.create(ID.unique(),email, password,name);
            if(userAccount){
                //Call another method.
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(e){
            throw e;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Error in getCurrentUser", error);
        }
    }
    
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;