package visual;

import java.util.ArrayList;
import java.util.List;

import com.beust.jcommander.Parameter;

public class JCommanderParser {

	public JCommanderParser() {
	}

	@Parameter
	private List<String> parameters = new ArrayList<String>();

	@Parameter(names = "--input", description = "The file to be parsed")
	private String files;

	@Parameter(names = "--output", description = "The output file, if any")
	private String output;

	@Parameter(names = "--format", description = "The format output may be released")
	private String format;

	@Parameter(names = "--width", description = "Width of the ouput")
	private String width;

	@Parameter(names = "--height", description = "Height of the ouput")
	private String height;

	public final List<String> getParameters() {
		return parameters;
	}

	public final String getInput() {
		return files;
	}

	public final String getOutput() {
		return output;
	}

	public final String getFormat() {
		return format;
	}

	public final String getWidth() {
		return width;
	}

	public final String getHeight() {
		return height;
	}
}