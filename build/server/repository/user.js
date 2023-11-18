import path from"path";import{__data_dir}from"../config.js";import{User}from"../models/user.js";import{Error}from"../types/error.js";import fs from"fs";export default class UserRepository{static SAVE_FILENAME=path.join(__data_dir,"user-repository.json");users=new Map;static id;constructor(){this.load()}getById=async s=>{if(this.users.has(s))return this.users.get(s);throw new Error(404,`User with id ${s} does not exist`)};async getUsers(s){return void 0===s?[...this.users.values()]:s.filter(s=>this.users.has(Number(s))).map(s=>this.users.get(Number(s)))}async create(s){if(s.isValid())return s.id=UserRepository.id++,this.users?.set(s.id,s),console.info("[UserRepository] User created: "+s.name),await this.save(),s;throw new Error(400,"Invalid Request Body")}async update(s,e){if(!e.isValid())throw new Error(400,"Bad Request");var r;if(this.users?.has(s))return r=this.users.get(s),e.id=e.id??r.id,e.name=e.name??r.name,e.email=e.email??r.email,e.date=e.date??r.date,e.status=e.status??r.status,e.role=e.role??r.role,e.friends=e.friends??r.friends,this.users?.set(s,e),console.info("[UserRepository] User edited: "+e.name),await this.save(),e;throw new Error(404,`User with ID ${s} is not found`)}async delete(s){if(this.users?.has(s))return this.users?.delete(s),await this.save(),!0;throw new Error(404,`User with ID ${s} is not found`)}async getFriendsById(s){if(!this.users.has(s))throw new Error(404,`User with id ${s} does not exist`);s=this.users.get(s).friends;if(!s)throw new Error(404,"Friends not found");var e=[];for(const r of s)this.users.has(r)&&e.push(this.users.get(r));return e}load(){if(fs.existsSync(UserRepository.SAVE_FILENAME)){var s,e=fs.readFileSync(UserRepository.SAVE_FILENAME),e=JSON.parse(e.toString());UserRepository.id=e.length;for(s of e){var r=User.fromObject(s);this.users.set(r.id,r)}console.info("[UserRepository] Data loaded")}else console.warn(`[UserRepository] Storage file ${UserRepository.SAVE_FILENAME} is not found`)}async save(){var s=Array.from(this.users.values()),s=JSON.stringify(s,null,2);fs.existsSync(path.dirname(UserRepository.SAVE_FILENAME))||(fs.mkdirSync(path.dirname(UserRepository.SAVE_FILENAME)),console.log("[UserRepository] Created directory "+path.dirname(UserRepository.SAVE_FILENAME))),fs.writeFileSync(UserRepository.SAVE_FILENAME,s),console.log("[UserRepository] Data saved to "+UserRepository.SAVE_FILENAME)}}
//# sourceMappingURL=user.js.map
