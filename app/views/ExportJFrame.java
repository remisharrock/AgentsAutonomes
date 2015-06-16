//package views;
//
//import java.awt.BorderLayout;
//import java.awt.Color;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.Set;
//
//import javax.swing.JFrame;
//
//import logic.CausalRelation;
//
//import org.gephi.graph.api.DirectedGraph;
//import org.gephi.graph.api.Edge;
//import org.gephi.graph.api.GraphController;
//import org.gephi.graph.api.GraphModel;
//import org.gephi.graph.api.Node;
//import org.gephi.preview.api.PreviewController;
//import org.gephi.preview.api.PreviewModel;
//import org.gephi.preview.api.PreviewProperty;
//import org.gephi.preview.api.ProcessingTarget;
//import org.gephi.preview.api.RenderTarget;
//import org.gephi.preview.types.DependantOriginalColor;
//import org.gephi.project.api.ProjectController;
//import org.gephi.project.api.Workspace;
//import org.openide.util.Lookup;
//
//import processing.core.PApplet;
//
///**
// * Works for (1, 1) bijection.
// */
//public class ExportJFrame implements Runnable {
//
//	Set<CausalRelation> data;
//
//	/**
//	 * Works for (1, 1) bijection.
//	 */
//	public ExportJFrame(Set<CausalRelation> data) {
//		this.data = data;
//	}
//
//	@Override
//	public void run() {
//		// Init a project - and therefore a workspace
//		ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
//		pc.newProject();
//		Workspace workspace = pc.getCurrentWorkspace();
//
//		// Import data
//		// Get a graph model - it exists because we have a workspace
//		GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
//
//		// Append as a Directed Graph
//		DirectedGraph directedGraph = graphModel.getDirectedGraph();
//
//		// Nodes. TODO it's lazy to do it in two loops.
//		HashMap<String, Node> o = new HashMap<>();
//		data.stream().flatMap(r -> Arrays.asList(r.getTriggerActor(), r.getActionActor()).stream()).distinct()
//				.forEach(x -> {
//					Node n = graphModel.factory().newNode();
//					n.getNodeData().setLabel(x.path().name());
//					o.put(x.path().toStringWithoutAddress(), n);
//				});
//
//		// Edge
//		data.stream().forEach(
//				x -> {
//					Edge e = graphModel.factory().newEdge(o.get(x.getTriggerActor().path().toStringWithoutAddress()),
//							o.get(x.getActionActor().path().toStringWithoutAddress()), 1f, true);
//				});
//
//		// Preview configuration
//		PreviewController previewController = Lookup.getDefault().lookup(PreviewController.class);
//		PreviewModel previewModel = previewController.getModel();
//		previewModel.getProperties().putValue(PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
//		previewModel.getProperties()
//				.putValue(PreviewProperty.NODE_LABEL_COLOR, new DependantOriginalColor(Color.WHITE));
//		previewModel.getProperties().putValue(PreviewProperty.EDGE_CURVED, Boolean.FALSE);
//		previewModel.getProperties().putValue(PreviewProperty.EDGE_OPACITY, 50);
//		previewModel.getProperties().putValue(PreviewProperty.EDGE_RADIUS, 10f);
//		previewModel.getProperties().putValue(PreviewProperty.BACKGROUND_COLOR, Color.BLACK);
//		previewController.refreshPreview();
//
//		// New Processing target, get the PApplet
//		ProcessingTarget target = (ProcessingTarget) previewController.getRenderTarget(RenderTarget.PROCESSING_TARGET);
//		PApplet applet = target.getApplet();
//		applet.init();
//
//		// Refresh the preview and reset the zoom
//		previewController.render(target);
//		target.refresh();
//		target.resetZoom();
//
//		// Add the applet to a JFrame and display
//		JFrame frame = new JFrame("Test Preview");
//		frame.setLayout(new BorderLayout());
//
//		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//		frame.add(applet, BorderLayout.CENTER);
//
//		frame.pack();
//		frame.setVisible(true);
//	}
//}