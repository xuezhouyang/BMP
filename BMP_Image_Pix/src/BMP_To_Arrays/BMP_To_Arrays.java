package BMP_To_Arrays;
import java.io.*;
import java.awt.*;
import java.awt.image.*;

import javax.imageio.*;

public class BMP_To_Arrays {
	public static void main(String[] args) {
		String sourceFileDir = "G:/4.bmp";
		File sourceFile = new File(sourceFileDir);
		OutputStream output = null;
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
//			获得rgbArray数组
			img.getRGB(startX, startY, imageWidth, imageHeight, rgbArray, offset, scanSize);
//			修改Pix值写入到rgbArray数组中
			int insertX = 0;
			int insertY = 0;
			int insertR = 0;
			int insertG = 0;
			int insertB = 0;
			
			for(insertX = 0; insertX < 100; insertX ++){
				for(insertY = 0; insertY < 100; insertY ++){
					insertPix(imageHeight, imageWidth, rgbArray, offset, scanSize, startX, startY, insertX, insertY, insertR, insertG, insertB);
				}
			
			}
//			将修改后的rgbArray写入img
			img.setRGB(startX, startY, imageWidth, imageHeight, rgbArray, offset, scanSize);
//			getImageInfo( imageHeight,  imageWidth,  offset,  scanSize,  startX,  startY);
//			testChanged(imageHeight, imageWidth, rgbArray, offset, scanSize, startX, startY);
			
//			准备新的img输出流
			String outDir = sourceFileDir + ".bak.bmp";
			File out = new File(outDir);
			if(!out.exists()){
				out.createNewFile();
			}else{			
			}
			output = new FileOutputStream(out);
			BufferedImage imgOut = new BufferedImage(imageWidth, imageHeight, imageType);
			imgOut.setRGB(startX, startY, imageWidth, imageHeight, rgbArray, offset, scanSize);
			ImageIO.write(imgOut, "bmp", output);
			img = null;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			sourceFile = null;
			sourceFileDir = null;
			if(output != null){
				try{
					output.close();
				}catch(IOException e){
					
				}
			}
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
	
	private static void insertPix(int imageHeight, int imageWidth, int[] rgbArray, int offset, int scanSize, int startX, int startY, int insertX, int insertY, int r, int g, int b){
		Color c = new Color(r,g,b);
		rgbArray[offset + (insertY - startY) * scanSize + (insertX - startX)] = c.getRGB();
		System.out.println("The Point (" + insertX + "." + insertY + ") RGB Value is " + c + ".. INSERT SUCCESS !");
		c = null;
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
				c = null;
			}
		}
		
	}
}
