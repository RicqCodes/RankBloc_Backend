import { Request, Response, NextFunction } from "express";

const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  const { id } = req.params;
  if (+id > 10) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

export default checkID;

// import { Request, Response, NextFunction } from 'express';
// import { Types } from 'mongoose';

// const checkID: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;

//   if (!Types.ObjectId.isValid(id)) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'Invalid ID',
//     });
//   }

//   // Check if a document with the provided ID exists
//   try {
//     const document = await YourModel.findById(id); // Replace YourModel with your actual model name

//     if (!document) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Document not found',
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       message: 'Error checking ID',
//     });
//   }

//   next();
// };
