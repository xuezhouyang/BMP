package BMP_To_Arrays;
import java.io.*;
import java.awt.*;
import java.awt.image.*;
import javax.imageio.*;

public class BMP_To_Arrays {
	public static void main(String[] args) {
		String sourceFileDir = "G:/4.bmp";
		File sourceFile = new File(sourceFileDir);
		try{
			BufferedImage img = ImageIO.read(sourceFile);
			int imageType = img.getType();
			int imageWidth = img.getWidth();
			int imageHeight = img.getHeight();
			int startX = 0;
			int startY = 0;
			int offset = 0;
			int scanSize = imageWidth;
			
			int[] rgbArray = new int[offset + (imageHeight - startY) * scanSize + (imageWidth - startX)];
			img.getRGB(startX, startY, imageWidth, imageHeight, rgbArray, offset, scanSize);
			
//			getImageInfo( imageHeight,  imageWidth,  offset,  scanSize,  startX,  startY);
//			testChanged(imageHeight, imageWidth, rgbArray, offset, scanSize, startX, startY);
			
		}catch(IOException ex){
			
		}
		
	}
	
	private static void getImageInfo(int imageHeight, int imageWidth, int offset, int scanSize, int startX, int startY){
		System.out.println("imageHeight" + "\t" + imageHeight);
		System.out.println("imageWidth"  + "\t" + imageWidth);
		System.out.println("scanSize"  + "\t" + scanSize);
		System.out.println("offset"  + "\t" + offset);
		System.out.println("startX"  + "\t" + startX);
		System.out.println("startY"  + "\t" + startY);
	}
	
	private static void testChanged(int imageHeight, int imageWidth, int[] rgbArray, int offset, int scanSize, int startX, int startY){
		int count = 0;
		for(int y0 = 0; y0 < imageHeight; y0 ++){
			for(int x0 = 0; x0 < imageWidth; x0 ++){
				int rgb = rgbArray[offset + (y0 - startY) * scanSize + (x0 - startX)];
				Color c = new Color(rgb);
				if(c.getRed() != 255){
					count ++;
					System.out.println("The " + count +" Point (" + x0 + "." + y0 + ") RGB Value is " + c);
				}
			}
		}
		
	}
}
