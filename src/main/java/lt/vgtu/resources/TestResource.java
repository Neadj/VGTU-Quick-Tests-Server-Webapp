package lt.vgtu.resources;

import static lt.vgtu.App.db;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.bson.Document;

@Path("/test")
@Produces(MediaType.APPLICATION_JSON)
public class TestResource {
    
    @POST
    public String createTest(String json) {
        db.getCollection("tests").insertOne(Document.parse(json));
        Document d = db.getCollection("tests").find().first();
        return json;
    }

    @GET
    public String getTests() {
	String res = "[";
	for(Document d : db.getCollection("tests").find()) {
		res += d.toJson() + ",";
	}
        return res.substring(0, res.length()-1) + "]";
    }
}
