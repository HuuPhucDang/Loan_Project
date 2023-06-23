import { Model, Document } from "mongoose";

export interface IContractTemplate {
  content: string
}

export interface IContractTemplateDoc extends IContractTemplate, Document {}

export interface IContractTemplateModel extends Model<IContractTemplateDoc> {}
