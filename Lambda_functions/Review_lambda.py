import boto3
from botocore.exceptions import ClientError
def lambda_handler(event, context):
    
    restaurant = event['rname']
    rating = event['stars']
    hidrate = rating
    bucket = event['image']['bucket']
    file_key = event['image']['name']
    print("file_key", file_key)
    text = event['text']    
    
    Rekclient = boto3.client('rekognition', 'us-east-1')
    
    comprehend = boto3.client(service_name = 'comprehend', region_name = 'us-east-1')
    
    sqs = boto3.resource('sqs')
    
    score_dict = {'HAPPY': 1, 'SAD': -0.5, 'ANGRY': -0.9, 'DISGUSTED': -1}
    
    #S3 Bucket test
    BUCKET_NAME = bucket # replace with your bucket name
    KEY = file_key # replace with your object key
    
    #Comprehend
    try:
        res = comprehend.detect_sentiment(Text = text, LanguageCode = 'en')
        print("Comprehend succedded")
        print("Comprehend", res)
        if 'SentimentScore' in res:
            sentscore = res['SentimentScore']
            positive = sentscore['Positive']
            negative = sentscore['Negative']
            hidrate += 0.25 * (positive - negative)
    except:
        print("Comprehend failed")
    
        
    #Rekonition
    try:
        #print("bucket", BUCKET_NAME)
        #print("key", KEY)
        response = Rekclient.detect_faces(Image = {'S3Object':{'Bucket': BUCKET_NAME, 'Name': KEY}}, Attributes = ['ALL'])
        
        print("Reknization succeeded")
        print("Reknization", response)
        
        if 'Smile' in response:
            if response['Smile']['Value']:
                hidrate += response['Smile']['Confidence']
        
        if 'Emotions' in response:
            for emotion in response['Emotions']:
                e_type = emotion['Type']
                conf = emotion['Confidence']
                if e_type in score_dict:
                    hidrate += score_dict[e_type] * conf
    except ClientError as e:
        print("Reknization failed")
        print(e)
        
    
    sqsmessage = str({'label':"rate", 'id':restaurant, 'text': text, 'rating': rating, 'hidrating': hidrate})
    print("SQS_send:", sqsmessage)
    
    # Get the queue. This returns an SQS.Queue instance
    queue = sqs.get_queue_by_name(QueueName='test')
    
    try:
        response = queue.send_message(MessageBody= sqsmessage)
    except:
        print("SQS error")
        #print(response)
    
    return 'Hello from LF3'
