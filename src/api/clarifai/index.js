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
                                url: 'https://samples.clarifai.com/metro-north.jpg', 
                                allow_duplicate_url: true 
                            } 
                    } 
                }
            ]
        },
        metadata,
        (err, response, box) => {
            if (err) {
                throw new Error(err);
            }
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
            box = response.outputs[0].data.regions[0].region_info.bounding_box;
            console.log('log', box);
        }
    );
});

export default clarifaiRouter;