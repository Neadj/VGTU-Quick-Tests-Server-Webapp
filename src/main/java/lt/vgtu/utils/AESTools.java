/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lt.vgtu.utils;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 *
 * @author Aymeric
 */
public class AESTools {
    
    private static final String algorithm = "AES";
    private static final String keyValue = "AdA6B4DhMYzM8Wpv";
    
    public static String encrypt(String data) throws Exception {
        Key key = getKey();
        Cipher c = Cipher.getInstance(algorithm);
        c.init(Cipher.ENCRYPT_MODE, key);
        byte[] encVal = c.doFinal(data.getBytes());
        String encryptedValue = new BASE64Encoder().encode(encVal);
        return encryptedValue;
    }
    
    public static String decrypt(String data) throws Exception {
        Key key = getKey();
        Cipher c = Cipher.getInstance(algorithm);
        c.init(Cipher.DECRYPT_MODE, key);
        byte[] decodedValue = new BASE64Decoder().decodeBuffer(data);
        decodedValue = c.doFinal(decodedValue);
        String decryptedValue = new String(decodedValue);
        return decryptedValue;
    }
    
    private static Key getKey() {
        Key key = new SecretKeySpec(keyValue.getBytes(), algorithm);
        return key;
    }
    
}
