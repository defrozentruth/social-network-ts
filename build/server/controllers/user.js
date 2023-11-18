import{User}from"../models/user.js";export default class UserController{userRepository;constructor(s){this.userRepository=s}getById=async(s,e)=>{try{var t=Number(s.params.id),r=await this.userRepository.getById(t);e.status(200).send(JSON.stringify(r))}catch(s){e.status(404).json({error:s.message})}};getAll=async(s,e)=>{try{var t=s.query.ids?s.query.ids.split(",").map(Number):void 0,r=await this.userRepository.getUsers(t);e.status(200).send(JSON.stringify(r))}catch(s){e.status(404).json({error:s.message})}};create=async(s,e)=>{try{var t=User.fromObject(s.body),r=await this.userRepository.create(t);e.status(201).send(JSON.stringify(r))}catch(s){e.status(400).json({error:s.message})}};update=async(s,e)=>{try{var t=Number(s.body.id),r=new User(t,s.body.name,s.body.email,s.body.date,s.body.status,s.body.role),a=await this.userRepository.update(t,r);e.status(200).send(JSON.stringify(a))}catch(s){e.status(400).json({error:s.message})}};delete=async(s,e)=>{try{var t=Number(s.params.id),r=await this.userRepository.delete(t);e.json({success:r})}catch(s){e.status(400).json({error:s.message})}};getFriendsByUserId=async(s,e)=>{try{var t=Number(s.params.id),r=await this.userRepository.getFriendsById(t);e.status(200).send(JSON.stringify(r))}catch(s){e.status(400).json({error:s.message})}}}
//# sourceMappingURL=user.js.map
