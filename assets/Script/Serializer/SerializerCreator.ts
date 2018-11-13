

export class SerializerCreator {

    public static _creatorArray: any = {};

    public static Register(name: string, creatorInvoke: Function) {
        SerializerCreator._creatorArray[name] = creatorInvoke
    }

    public static InitObject(name: string):any{

        var creator =  SerializerCreator._creatorArray[name]
        if(!creator)return null

        return creator();

        
    }
}