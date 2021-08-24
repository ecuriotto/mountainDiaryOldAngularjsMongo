conn = new Mongo();
db = conn.getDB("montagna");
var cur = db.diary.find().sort({"id":1});

var obj;
while(cur.hasNext()){
    obj = cur.next();
    print(obj.id+"\t"+obj.date+"\t"+obj.days+"\t"+obj.courseType+"\t"+obj.place+"\t"+obj.partners+"\t"+obj.description+"\t"+obj.descriptionDetail+"\t"+obj.descriptionUrl+"\t"+obj.photoUrl);
}
//print("\""+obj.id+"\";\""+obj.date+"\";\""+obj.days+"\"");
//id,date,days,courseType,place,partners,description,descriptionDetail,descriptionUrl,photoUrl