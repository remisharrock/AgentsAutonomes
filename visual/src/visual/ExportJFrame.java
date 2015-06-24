package visual;

import java.awt.BorderLayout;
import java.awt.Color;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
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
import org.gephi.layout.plugin.fruchterman.FruchtermanReingold;
import org.gephi.layout.plugin.fruchterman.FruchtermanReingoldBuilder;
import org.gephi.preview.api.PreviewController;
import org.gephi.preview.api.PreviewModel;
import org.gephi.preview.api.PreviewProperties;
import org.gephi.preview.api.PreviewProperty;
import org.gephi.preview.api.ProcessingTarget;
import org.gephi.preview.api.RenderTarget;
import org.gephi.preview.types.DependantOriginalColor;
import org.gephi.project.api.ProjectController;
import org.gephi.project.api.Workspace;
import org.gephi.ranking.api.Ranking;
import org.gephi.ranking.api.RankingController;
import org.gephi.ranking.api.Transformer;
import org.gephi.ranking.plugin.transformer.AbstractColorTransformer;
import org.gephi.ranking.plugin.transformer.AbstractSizeTransformer;
import org.gephi.statistics.plugin.GraphDistance;
import org.openide.util.Lookup;

import processing.core.PApplet;

import com.beust.jcommander.JCommander;

/**
 * This is the main class. The purpose of this object is to deal with graph is a
 * loosy-coupling way.
 */
public class ExportJFrame {

	List<visual.Edge> edges;
	ProjectController pc;
	Workspace workspace;

	public ExportJFrame(List<visual.Edge> edges) {
		this.edges = edges;
		// Init a project - and therefore a workspace
		pc = Lookup.getDefault().lookup(ProjectController.class);
		pc.newProject();
		workspace = pc.getCurrentWorkspace();
	}

	public static void main(String[] args) throws UnsupportedEncodingException {

		JCommanderParser arguments = new JCommanderParser();
		new JCommander(arguments, args);

		if (arguments.getInput() == null || arguments.getInput().contentEquals("")) {
			System.err.println("Argument --input incorrect");
			return; // Error Barrier.
		}

		if (arguments.getFormat() == null || arguments.getFormat().contentEquals("")) {
			System.err.println("Argument --format incorrect");
			return; // Error Barrier.
		}

		if (arguments.getOutput() == null || arguments.getOutput().contentEquals("")) {
			System.err.println("Argument --output incorrect");
			return; // Error Barrier.
		}

		if (!arguments.getFormat().contentEquals("svg") && !arguments.getFormat().contentEquals("win")) {
			System.err.println("Argument --format unknown");
			return; // Error Barrier.
		}

		// Now all is clean.
		final File inputFile = new File(arguments.getInput());
		File outputFile = new File(arguments.getOutput());
		final String format = arguments.getFormat();

		ExportJFrame jframe = new ExportJFrame(parse(inputFile));
		jframe.populateGraph();
		jframe.layoutGraph();
		jframe.beautifyGraph();

		if (format.contentEquals("svg")) {
			jframe.outputSvg(outputFile);
		} else if (format.contentEquals("win")) {
			jframe.outputWin();
		}

	}

	public void outputSvg(File file) {
		PreviewModel model = Lookup.getDefault().lookup(PreviewController.class).getModel();
		PreviewProperties props = model.getProperties();
		props.putValue(PreviewProperty.SHOW_NODE_LABELS, true);
		props.putValue(PreviewProperty.EDGE_CURVED, false);
		props.putValue(PreviewProperty.ARROW_SIZE, 8f);
		props.putValue(PreviewProperty.EDGE_THICKNESS, 8f);
		props.putValue(PreviewProperty.MARGIN, 30);
		props.putValue(PreviewProperty.NODE_LABEL_FONT,
				model.getProperties().getFontValue(PreviewProperty.NODE_LABEL_FONT)
						.deriveFont(java.awt.Font.PLAIN, 10f));
		SVGExporter svgExporter = new SVGExporter();
		svgExporter.setScaleStrokes(true);
		svgExporter.setWorkspace(workspace);
		svgExporter.setScaleStrokes(true);
		FileWriter fw = null;
		try {
			fw = new FileWriter(file);
			svgExporter.setWriter(fw);
			svgExporter.execute();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				fw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public void outputWin() {
		(new Thread() {
			@Override
			public void run() {
				try {
					createWin();
				} catch (UnsupportedEncodingException e) {
					/*
					 * Mais sérieusement, osef, s'il y avait un problème il
					 * aurait déjà eu 15 fois le temps d'exploser…
					 */
				}
			}
		}).start();
	}

	public void createWin() throws UnsupportedEncodingException {

		// Preview configuration
		PreviewController previewController = Lookup.getDefault().lookup(PreviewController.class);
		PreviewModel previewModel = previewController.getModel();
		PreviewProperties props = previewModel.getProperties();

		props.putValue(PreviewProperty.EDGE_OPACITY, 50);
		props.putValue(PreviewProperty.EDGE_RADIUS, 10f);
		props.putValue(PreviewProperty.EDGE_THICKNESS, new Float(0.1f));

		props.putValue(PreviewProperty.SHOW_NODE_LABELS, true);
		props.putValue(PreviewProperty.EDGE_CURVED, false);
		props.putValue(PreviewProperty.ARROW_SIZE, 8f);
		props.putValue(PreviewProperty.EDGE_THICKNESS, 8f);
		props.putValue(PreviewProperty.NODE_LABEL_FONT,
				props.getFontValue(PreviewProperty.NODE_LABEL_FONT).deriveFont(java.awt.Font.PLAIN, 10f));

		props.putValue(PreviewProperty.BACKGROUND_COLOR, Color.WHITE);

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

	public static List<visual.Edge> parse(File file) {
		try {
			List<visual.Edge> list = new ArrayList<Edge>();
			BufferedReader br = new BufferedReader(new FileReader(file));

			String line = null;
			if ((line = br.readLine()) != null)
				/*
				 * If there is a first line we skip it: it's headers. If there
				 * is even no first line, we return then an non-null, empty
				 * list.
				 */
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

	public void populateGraph() {
		GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();

		// Append as a Directed Graph
		DirectedGraph directedGraph = graphModel.getDirectedGraph();

		HashMap<String, Node> known = new HashMap<String, Node>();
		for (int i = 0; i < edges.size(); i++) {
			visual.Edge edge = edges.get(i);
			if (!known.containsKey(edge.from.id)) {
				Node n = graphModel.factory().newNode();
				try {
					n.getNodeData().setLabel(URLDecoder.decode(edge.from.name, "UTF-8"));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				known.put(edge.from.id, n);
				directedGraph.addNode(n);
			}
			if (!known.containsKey(edge.to.id)) {
				Node n = graphModel.factory().newNode();
				try {
					n.getNodeData().setLabel(URLDecoder.decode(edge.to.name, "UTF-8"));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				known.put(edge.to.id, n);
				directedGraph.addNode(n);
			}
			directedGraph.addEdge(graphModel.factory()
					.newEdge(known.get(edge.from.id), known.get(edge.to.id), 1f, true));
		}
	}

	/**
	 * In our case, the Fruchterman-Reingold seems to fit well.
	 * 
	 * The Fruchterman-Reingold Algorithm is a force-directed layout algorithm.
	 * The idea of a force directed layout algorithm is to consider a force
	 * between any two nodes. In this algorithm, the nodes are represented by
	 * steel rings and the edges are springs between them. The attractive force
	 * is analogous to the spring force and the repulsive force is analogous to
	 * the electrical force. The basic idea is to minimize the energy of the
	 * system by moving the nodes and changing the forces between them. For more
	 * details refer to the Force Directed algorithm.
	 * 
	 * In this algorithm, the sum of the force vectors determines which
	 * direction a node should move. The step width, which is a constant
	 * determines how far a node moves in a single step. When the energy of the
	 * system is minimized, the nodes stop moving and the system reaches it's
	 * equilibrium state. The drawback of this is that if we define a constant
	 * step width, there is no guarantee that the system will reach equilibrium
	 * at all. T.M.J. Fruchterman and E.M. Reingold introduced a
	 * "global temperature" that controls the step width of node movements and
	 * the algorithm's termination. The step width is proportional to the
	 * temperature, so if the temperature is hot, the nodes move faster (i.e, a
	 * larger distance in each single step). This temperature is the same for
	 * all nodes, and cools down at each iteration. Once the nodes stop moving,
	 * the system terminates.
	 */
	public void layoutGraph() {
		GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();

		FruchtermanReingold layout = new FruchtermanReingold(new FruchtermanReingoldBuilder());
		layout.setGraphModel(graphModel);
		layout.initAlgo();
		layout.resetPropertiesValues();
		layout.setGravity((double) 10);
		layout.setSpeed((double) 5);

		for (int i = 0; i < 300 && layout.canAlgo(); i++) {
			layout.goAlgo();
		}
		layout.endAlgo();
	}

	/**
	 * We make it somewhat more beautiful by playing on node colour and size.
	 */
	private void beautifyGraph() {
		RankingController rankingController = Lookup.getDefault().lookup(RankingController.class);
		@SuppressWarnings("rawtypes")
		Ranking degreeRanking = rankingController.getModel().getRanking(Ranking.NODE_ELEMENT, Ranking.DEGREE_RANKING);

		@SuppressWarnings("rawtypes")
		AbstractColorTransformer colorTransformer = (AbstractColorTransformer) rankingController.getModel()
				.getTransformer(Ranking.NODE_ELEMENT, Transformer.RENDERABLE_COLOR);
		colorTransformer.setColors(new Color[] { new Color(0xD09332), new Color(0xB30000) });

		@SuppressWarnings("rawtypes")
		AbstractSizeTransformer sizeTransformer = (AbstractSizeTransformer) rankingController.getModel()
				.getTransformer(Ranking.NODE_ELEMENT, Transformer.RENDERABLE_SIZE);
		sizeTransformer.setMinSize(15);
		sizeTransformer.setMaxSize(20);

		rankingController.transform(degreeRanking, colorTransformer);
		rankingController.transform(degreeRanking, sizeTransformer);
	}
}
