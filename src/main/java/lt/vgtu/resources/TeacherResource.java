package lt.vgtu.resources;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import static lt.vgtu.App.db;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import lt.vgtu.utils.AESTools;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 * This class allows to create teacher accounts, connect and disconnect.
 * @author aymeric
 */
@Path("/teacher")
@Produces(MediaType.APPLICATION_JSON)
public class TeacherResource {
    
    private static Map<UUID, ObjectId> sessions = new HashMap<>();
    
    /**
     * Reads the json containing all the informations of the teacher, encrypts
     * the password and saves everything in the database.
     * @param json
     * @return Either an error or a success message.
     */
    @POST
    public String createTeacher(String json) {
        Document teacher = Document.parse(json);
        if(!validDocument(teacher))
            return "ERROR";
        try {
            teacher.replace("pwd", AESTools.encrypt(teacher.getString("pwd")));
        } catch (Exception ex) {
            Logger.getLogger(TeacherResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        if(db.getCollection("teachers").find(teacher).first() != null)
            return "ERROR";
        db.getCollection("teachers").insertOne(teacher);
        return "OK";
    }
    
    private boolean validDocument(Document d) {
        return d.containsKey("name") && d.containsKey("login") && d.containsKey("pwd");
    }
    
    /**
     * This reads the login of the teacher, and sends a UUID standing for the
     * session id, which allows for more security.
     * @param json
     * @return A session token.
     */
    @POST
    @Path("/connect")
    public String connect(String json) {
        Document login = Document.parse(json);
        try {
            login.replace("pwd", AESTools.encrypt(login.getString("pwd")));
        } catch (Exception ex) {
            Logger.getLogger(TeacherResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        Document user = db.getCollection("teachers").find(login).first();
        if(user != null) {
            UUID sessionId = UUID.randomUUID();
            ObjectId id = user.getObjectId("_id");
            sessions.put(sessionId, id);
            return sessionId.toString();
        }
        return "Error : Bad login";
    }
    
    /**
     * This function receives a session token and removes it from the hashmap,
     * so it becomes no longer available.
     * @param sessionId
     * @return An error or success message.
     */
    @POST
    @Path("/disconnect")
    public String disconnect(String sessionId) {
        if(sessions.remove(UUID.fromString(sessionId)) != null)
            return "SUCCESS";
        return "ERROR";
    }
}
