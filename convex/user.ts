import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser= mutation({
    args: {
     name:v.string(),
     imageUrl:v.string(),
     email:v.string(),
    
    },
    handler: async(ctx,args)=>{
//  if user Already exist

        const user=await ctx.db.query("userTable").filter((q)=>q.eq(q.field("email"),args.email)).collect();

        if(user.length===0){
            const userData={name:args.name, imageUrl:args.imageUrl,email:args.email}
            

            //  if Not then create new user
            const result = await ctx.db.insert("userTable", userData);

            return  result
        
        }
        return user[0];
            
        }


     
    }   
)