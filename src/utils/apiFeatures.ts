import { Document, Query, Types } from "mongoose";
import { ParsedQs } from "qs";
import { IUser } from "../interfaces/User";

export class ApiFeatures {
  query: any;
  queryString: any;
  constructor(
    query: Query<
      (Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId })[],
      Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId },
      {},
      IUser,
      "find"
    >,
    queryString: ParsedQs
  ) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort as string;
      const sortBy = sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields as string;
      const returnedFields = fields.split(",").join(" ");

      this.query = this.query.select(returnedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
