import { Request, Response } from 'express';
import Resource, { IResource, ResourceType } from '../models/Resource';
import { getErrorMessage } from '../utils/errorHandler';
import { ConditionQueyType } from '../types/resource';


export const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource: IResource = new Resource(req.body);
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const getListResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search,fields,sortField, sortOrder } = req.query;
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.size as string) || 10;
    const skip: number = (page - 1) * limit;
    const type: ResourceType | undefined = req.query.type as ResourceType;
    const filter: any =  {};
    if(search){
      filter.$text = { $search: search };
    }
    if (type) {
      filter.type = type as ResourceType;
    }

    const pipeline: any[] = [];
    const matchStage: any = {};
    if (search) {
      matchStage.$text = { $search: search  };
    }
    if (type) {
      matchStage.type = type;
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
    if (typeof fields === 'string') {
      const fieldsArray = fields.split(',');
      const projection = fieldsArray.reduce((proj: { [key: string]: number }, field: string) => {
        proj[field.trim()] = 1;
        return proj;
      }, {});
      pipeline.push({ $project: projection });
    }

    if (sortField && sortOrder) {
      const sortStage: { [key: string]: number } = { [sortField as string]: sortOrder === 'desc' ? -1 : 1 };
      pipeline.push({ $sort: sortStage });
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: skip },
          { $limit: limit }
        ]
      }
    });

    const results = await Resource.aggregate(pipeline).exec();
    const total = results[0].metadata[0] ? results[0].metadata[0].total : 0;
    const resources = results[0].data;
    res.status(200).json({ total, resources });


  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const getResource = async (req: Request, res: Response): Promise<void> => {
  const {fields } = req.query;
  const resourceQuery = Resource.findById(req.params.id,{});
  if (typeof fields === 'string') {
    const fieldsArray = fields.split(',');
    const projection = fieldsArray.reduce((proj: { [key: string]: number }, field: string) => {
      proj[field.trim()] = 1;
      return proj;
    }, {});
    resourceQuery.select(projection);
  }
  try {
    const resource = await resourceQuery.exec();
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const updateResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (resource) {
      res.status(200).json({ message: 'Resource deleted successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};
