

import { AxiosRequestConfig } from "axios"
import { useQuery } from "react-query"
import axios from "../infrastructure/ApiHelper"

export interface CustomerMangementProps{
    data: []
}

class CustomerManagemnet<CustomerMangementProps>{
    constructor(data: any){
        this.data = data
        this.intialize()
    }
    intialize(){
        const customerList =  useQuery("getCustomersList",this.getCustomer)
      
    }
    async getCustomer(){
        const options: AxiosRequestConfig = {
            method: 'get',
            url: '/todos'
          }
        const result =  await axios(options)
    }
}


class Rectangle {
 
    constructor(height: any, width: any) {
      this.height = height;
      this.width = width;
    }
    // Getter
    get area() {
      return this.calcArea();
    }
    // Method
    calcArea() {
      return this.height * this.width;
    }
  }