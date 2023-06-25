import { Model, Document } from "mongoose";

export interface IContractTemplate {
  header: string;
  nameOfContract: string;
  sideA: string;
  sideB: string;
  terms: string;
}

export interface IContractTemplateDoc extends IContractTemplate, Document {}

export interface IContractTemplateModel extends Model<IContractTemplateDoc> {}
