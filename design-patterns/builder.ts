class S3ConfigurationBuilder {

    private region: string;
    private acl: string;
    private bucket: string;

    constructor(){
        this.region = '';
        this.acl = '';
        this.bucket = '';
    }

    setRegion(region: string = 'us-east-1') {
        this.region = region;
        return this;
    }
    setACL(acl: string = 'public-read') {
        this.acl = acl;
        return this;
    }
    setBucket(bucket: string) {
        this.bucket = bucket;
        return this;
    }

    getConfiguration() {
        if (!this.bucket)
            throw new Error('Bucket is required');
        return {
            Bucket: this.bucket,
            ACL: this.acl,
            Region: this.region
        }
    }
}

const liveModeConfBuilder = new S3ConfigurationBuilder();
const liveModeConfi = liveModeConfBuilder.setBucket('student-progress').getConfiguration();
console.log(liveModeConfi);



const authoringConfBuilder = new S3ConfigurationBuilder();
const authoringConfi =  authoringConfBuilder.setACL('private').setBucket('authoring').getConfiguration();
console.log(authoringConfi);
