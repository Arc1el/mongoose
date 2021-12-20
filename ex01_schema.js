const mongoose = require('mongoose');

const imageSchema = new mongoose.schema({
    width: Number,
    height: Number,
});

const userSchema = new mongoose.Schema({

    //필수, 유일, 소문자
    email: { type: String, required: true,
        unique: true, lowercase: true },
    //문자열, 필수, 공백제거(trim)
    password: { type : String, required: true, trim: true },
    nickname: String,
    //default - 기본값 설정. 현재시간
    birth: { type: Date, default: Date.now },
    //max값으로 최대값 설정. 기본값은 0
    point: { type: Number, default: 0, max: 50, index: true },
    //객체가 들어감 따로 싀마 만들어서 정해주었음 (w, h)
    image: imageSchema,
    //문자열의 배열
    likes: [String],
    //아무거나 들어갈 수 있음
    any: [mongoose.Schema.Types.Mixed],
    //오브젝트id를 넣을수 있는 필드
    id: mongoose.schema.Types.ObjectId,
});

userSchema.virtual('detail').get(function() {
    return `저는 ${this.nickname}이고 생일은 
    ${this.birth.toLocaleString()}입니다.`;
});

userSchema.methods.comparePassword = function(pw, cb){
    if(this.password == pw){
        cb(null, true);
    }else {
        cb('password not matched');
    }
};

user.comparePassword('password', function(err, result) {
    if(err) {
        throw err;
    }
    console.log(rewult);
});

//복합인덱스 가능
userSchema.index({ email: 1, nickname: 1});

module.exports = mongoose.model('User', userSchema);
