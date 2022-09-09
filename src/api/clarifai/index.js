import {Router} from 'express';
import {ClarifaiStub, grpc} from 'clarifai-nodejs-grpc';
import dotenv from 'dotenv';

dotenv.config();

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.PAT);

const clarifaiRouter = Router();

clarifaiRouter.post('/faceDetection', (req, res) => {
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": process.env.USER_ID,
                "app_id": process.env.APP_ID
            },
            model_id: 'face-detection',
            version_id: '', 
            inputs: [
                { 
                    data: 
                        { image: 
                            { 
                                url: req.body.imageUrl, 
                                allow_duplicate_url: true 
                            } 
                    } 
                }
            ]
        },
        metadata,
        (err, response) => {
            if (err || response.status.code !== 10000) {
                res.status(400).json("an error has occured");
            }
            else {
                const box = response.outputs[0].data.regions[0].region_info.bounding_box;
                res.status(200).json(box);
            }
        }
    );
});

export default clarifaiRouter;