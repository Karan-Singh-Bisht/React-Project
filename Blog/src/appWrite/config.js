import config from "../config/config";  //This is the file with all the env files.
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket; //storage
	constructor() {
		this.client //this only works inside Objects and normal functions.
			.setEndpoint(config.appwriteUrl) //Methods are functions stored as object value.
			.setProject(config.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDataBaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }catch(e){
            throw e;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDataBaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDataBaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true; 
        }catch(error){
            console.log("Error in deletePost",error);
            return false;
        }
    }

    async getUniquePost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDataBaseId,
                config.appwriteCollectionId,
                slug,
            )
        }catch(error){
            console.log("Error in getUniquePost",error);
            return false;
        }
    }

    async getAllPosts(){
        try{
            return await this.databases.listDocuments(
                config.appwriteDataBaseId,
                config.appwriteCollectionId,
                [Query.equal("status","active")]
            )
        }catch(error){
            console.log("Error in getAllPosts",error);
            return false;
        }
    }

    //File upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Error in uploadFile",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
        }catch(error){
            console.log("Error in DeleteFile",error);
            return false;
        }
    }

    getFilePreview(fileId){    //no need to use async bcuz its response is very fast.
        try{
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
        }catch(error){
            console.log("Error in getFilePreview",error);
            return false;
        }
    }
}

const service = new Service();

export default service;
