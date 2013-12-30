import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;


public class BMP_Image_Java_Test {
	public static void main(String[] args) {  
        OutputStream output = null;  
        try {  
            // read bmp  
            BufferedImage img = ImageIO.read(new File("G:/test.bmp"));  
            int imageType = img.getType();  
            int w = img.getWidth();  
            int h = img.getHeight();  
            int startX = 0;  
            int startY = 0;  
            int offset = 0;  
            int scansize = w;  
            // rgb的数组  
            int[] rgbArray = new int[offset + (h - startY) * scansize  
                    + (w - startX)];  
            img.getRGB(startX, startY, w, h, rgbArray, offset, scansize);  
  
            int x0 = w / 2;  
            int y0 = h / 2;  
            int rgb = rgbArray[offset + (y0 - startY) * scansize  
                    + (x0 - startX)];  
            
            Color c = new Color(rgb);  
            System.out.println("中间像素点的rgb：" + c);  
            // create and save to bmp  
            File out = new File("G:/2.bmp");  
            if (!out.exists())  
                out.createNewFile();  
            output = new FileOutputStream(out);  
            BufferedImage imgOut = new BufferedImage(w, h, imageType);  
            imgOut.setRGB(startX, startY, w, h, rgbArray, offset, scansize);  
            ImageIO.write(imgOut, "bmp", output);  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            if (output != null)  
                try {  
                    output.close();  
                } catch (IOException e) {  
                }  
        }  
    }  
}
