package visual;

import java.awt.BorderLayout;
import java.awt.Color;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.swing.JFrame;

import org.gephi.graph.api.DirectedGraph;
import org.gephi.graph.api.GraphController;
import org.gephi.graph.api.GraphModel;
import org.gephi.graph.api.Node;
import org.gephi.io.exporter.preview.SVGExporter;
import org.gephi.layout.plugin.force.StepDisplacement;
import org.gephi.layout.plugin.force.yifanHu.YifanHuLayout;
import org.gephi.layout.plugin.scale.Contract;
import org.gephi.layout.plugin.scale.ScaleLayout;
import org.gephi.preview.api.PreviewController;
import org.gephi.preview.api.PreviewModel;
import org.gephi.preview.api.PreviewProperties;
import org.gephi.preview.api.PreviewProperty;
import org.gephi.preview.api.ProcessingTarget;
import org.gephi.preview.api.RenderTarget;
import org.gephi.preview.types.DependantOriginalColor;
import org.gephi.project.api.ProjectController;
import org.gephi.project.api.Workspace;
import org.openide.util.Lookup;

import processing.core.PApplet;

import com.beust.jcommander.JCommander;

public class ExportJFrame {

	List<visual.Edge> edges;

	public ExportJFrame(List<visual.Edge> edges) {
		this.edges = edges;
	}

	public static void main(String[] args) throws UnsupportedEncodingException {

		JCommanderParser arguments = new JCommanderParser();
		new JCommander(arguments, args);

		final File file;

		if (arguments.getInput() != null && !arguments.getInput().contentEquals("")) {
			file = new File(arguments.getInput());
		} else {
			System.err.println("Argument --input incorrect");
			file = null;
		}

		if (arguments.getFormat() != null && !arguments.getFormat().contentEquals("")) {
			if (arguments.getFormat().contentEquals("win")) {
				(new ExportJFrame(parse(file))).outputWin(file);
			} else if (arguments.getFormat().contentEquals("svg")) {
				if (arguments.getOutput() != null && !arguments.getOutput().contentEquals("")) {
					(new ExportJFrame(parse(file))).outputSvg(new File(arguments.getOutput()));
				} else {
					System.err.println("Argument --output incorrect");
				}
			} else {
				System.err.println("Argument --format unknown");
			}
		} else {
			System.err.println("Argument --format incorrect");
		}

	}

	/**
	 * @param file
	 *            The file to outut in.
	 * @throws UnsupportedEncodingException
	 */
	public void outputSvg(File file) throws UnsupportedEncodingException {
		// Init a project - and therefore a workspace
		ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
		pc.newProject();
		Workspace workspace = pc.getCurrentWorkspace();

		// Import data
		// Get a graph model - it exists because we have a workspace
		GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();

		// Append as a Directed Graph
		DirectedGraph directedGraph = graphModel.getDirectedGraph();

		HashMap<String, Node> known = new HashMap<String, Node>();
		for (int i = 0; i < edges.size(); i++) {
			visual.Edge edge = edges.get(i);
			if (!known.containsKey(edge.from.id)) {
				Node n = graphModel.factory().newNode();
				n.getNodeData().setLabel(URLDecoder.decode(edge.from.name, "UTF-8"));
				known.put(edge.from.id, n);
				directedGraph.addNode(n);
			}
			if (!known.containsKey(edge.to.id)) {
				Node n = graphModel.factory().newNode();
				n.getNodeData().setLabel(URLDecoder.decode(edge.to.name, "UTF-8"));
				known.put(edge.to.id, n);
				directedGraph.addNode(n);
			}
			directedGraph.addEdge(graphModel.factory()
					.newEdge(known.get(edge.from.id), known.get(edge.to.id), 1f, true));
		}

		YifanHuLayout yifanHuLayout = new YifanHuLayout(null, new StepDisplacement(1f));
		yifanHuLayout.setGraphModel(graphModel);
		yifanHuLayout.initAlgo();
		yifanHuLayout.resetPropertiesValues();
		yifanHuLayout.setOptimalDistance(200f);

		for (int i = 0; i < 10 && yifanHuLayout.canAlgo(); i++) {
			yifanHuLayout.goAlgo();
		}
		yifanHuLayout.endAlgo();

		ScaleLayout layout = (new Contract()).buildLayout();
		layout.setGraphModel(graphModel);
		layout.initAlgo();
		layout.resetPropertiesValues();

		for (int i = 0; i < 5 && layout.canAlgo(); i++) {
			layout.goAlgo();
		}
		layout.endAlgo();

		// Preview configuration
		PreviewModel model = Lookup.getDefault().lookup(PreviewController.class).getModel();
		PreviewProperties props = model.getProperties();
		props.putValue(PreviewProperty.SHOW_NODE_LABELS, true);
		props.putValue(PreviewProperty.EDGE_CURVED, false);
		SVGExporter sVGExporter = new SVGExporter();
		sVGExporter.setScaleStrokes(true);
		sVGExporter.setWorkspace(workspace);
		try {
			System.out.println(file.getAbsolutePath());
			FileWriter fw = new FileWriter(file);
			sVGExporter.setWriter(fw);
			sVGExporter.execute();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void outputWin(File file) {
		(new Thread() {
			@Override
			public void run() {
				try {
					(new ExportJFrame(parse(file))).createWin();
				} catch (UnsupportedEncodingException e) {
					/*
					 * Mais sérieusement, osef, s'il y avait un problème il
					 * aurait déjà eu 15 fois le temps d'exploser…
					 */
				}
			}
		}).start();
	}

	public static List<visual.Edge> parse(File file) {
		try {
			List<visual.Edge> list = new ArrayList<Edge>();
			BufferedReader br = new BufferedReader(new FileReader(file));

			String line = null;
			while ((line = br.readLine()) != null) {
				String[] split = line.split("\t");
				list.add(new visual.Edge(new visual.Node(split[0], split[1]), new visual.Node(split[2], split[3])));
			}

			br.close();

			return list;
		} catch (Exception e) {
			// I'm fed up with all that shit. I agree to get exception raised, I
			// need them to raise.
			e.printStackTrace();
		}
		return null;
	}

	public void createWin() throws UnsupportedEncodingException {
		// Init a project - and therefore a workspace
		ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
		pc.newProject();
		// Might be removed as it's useless.
		@SuppressWarnings("unused")
		Workspace workspace = pc.getCurrentWorkspace();

		// Import data
		// Get a graph model - it exists because we have a workspace
		GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();

		// Append as a Directed Graph
		DirectedGraph directedGraph = graphModel.getDirectedGraph();

		HashMap<String, Node> known = new HashMap<String, Node>();
		for (int i = 0; i < edges.size(); i++) {
			visual.Edge edge = edges.get(i);
			if (!known.containsKey(edge.from.id)) {
				Node n = graphModel.factory().newNode();
				n.getNodeData().setLabel(URLDecoder.decode(edge.from.name, "UTF-8"));
				known.put(edge.from.id, n);
				directedGraph.addNode(n);
			}
			if (!known.containsKey(edge.to.id)) {
				Node n = graphModel.factory().newNode();
				n.getNodeData().setLabel(URLDecoder.decode(edge.to.name, "UTF-8"));
				known.put(edge.to.id, n);
				directedGraph.addNode(n);
			}
			directedGraph.addEdge(graphModel.factory()
					.newEdge(known.get(edge.from.id), known.get(edge.to.id), 1f, true));
		}

		YifanHuLayout yifanHuLayout = new YifanHuLayout(null, new StepDisplacement(1f));
		yifanHuLayout.setGraphModel(graphModel);
		yifanHuLayout.initAlgo();
		yifanHuLayout.resetPropertiesValues();
		yifanHuLayout.setOptimalDistance(200f);

		for (int i = 0; i < 10 && yifanHuLayout.canAlgo(); i++) {
			yifanHuLayout.goAlgo();
		}
		yifanHuLayout.endAlgo();

		ScaleLayout layout = (new Contract()).buildLayout();
		layout.setGraphModel(graphModel);
		layout.initAlgo();
		layout.resetPropertiesValues();

		for (int i = 0; i < 5 && layout.canAlgo(); i++) {
			layout.goAlgo();
		}
		layout.endAlgo();

		// Preview configuration
		PreviewController previewController = Lookup.getDefault().lookup(PreviewController.class);
		PreviewModel previewModel = previewController.getModel();
		previewModel.getProperties().putValue(PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
		previewModel.getProperties().putValue(PreviewProperty.NODE_LABEL_COLOR, new DependantOriginalColor(Color.BLUE));
		previewModel.getProperties().putValue(PreviewProperty.EDGE_CURVED, Boolean.FALSE);
		previewModel.getProperties().putValue(PreviewProperty.EDGE_OPACITY, 50);
		previewModel.getProperties().putValue(PreviewProperty.EDGE_RADIUS, 10f);
		previewModel.getProperties().putValue(PreviewProperty.BACKGROUND_COLOR, Color.WHITE);
		previewController.refreshPreview();

		// New Processing target, get the PApplet
		ProcessingTarget target = (ProcessingTarget) previewController.getRenderTarget(RenderTarget.PROCESSING_TARGET);
		PApplet applet = target.getApplet();
		applet.init();

		// Refresh the preview and reset the zoom
		previewController.render(target);
		target.refresh();
		target.resetZoom();

		// Add the applet to a JFrame and display
		JFrame frame = new JFrame("Test Preview");
		frame.setLayout(new BorderLayout());

		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.add(applet, BorderLayout.CENTER);

		frame.pack();
		frame.setVisible(true);
	}
}
