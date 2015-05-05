package lt.vgtu;

import javax.ws.rs.GET;
import static lt.vgtu.App.db;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.bson.Document;

/**
 *
 * @author aymeric
 */
@Path("/teacher")
@Produces(MediaType.APPLICATION_JSON)
public class TeacherResource {
    
    @POST
    public String createTeacher(String json) {
        db.getCollection("teachers").insertOne(Document.parse(json));
        return "OK";
    }
    
    @GET
    public String helloWorld() {
        return "Hello world!";
    }
}
