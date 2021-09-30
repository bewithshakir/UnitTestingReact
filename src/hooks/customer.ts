import { AxiosRequestConfig } from "axios"
import { useQuery } from "react-query"
import axios from "../infrastructure/ApiHelper"

export interface CustomerMangementProps{
    data: []
}
class CustomerManagementModel<CustomerMangementProps>{
    data: []
    constructor(data: []){
        this.data = data
        this.intialize()
    }
    intialize(){
          useQuery("getCustomersList",this.getCustomer)
      
    }
    async getCustomer(){
        const options: AxiosRequestConfig = {
            method: 'get',
            url: 'http://20.81.30.168:4001/api/customer-service/customers?limit=15&offset=0&countryCode=us'
          }
        const result =  await axios(options)
        console.log(result)
    }
}

export {CustomerManagementModel}