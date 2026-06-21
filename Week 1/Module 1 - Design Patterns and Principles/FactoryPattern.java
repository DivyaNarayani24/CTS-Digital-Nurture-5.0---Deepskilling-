interface Document {
    void open();
}

class Word implements Document {
    public void open() {
        System.out.println("Opening Word document");
    }
}

class Pdf implements Document {
    public void open() {
        System.out.println("Opening PDF document");
    }
}

class Excel implements Document {
    public void open() {
        System.out.println("Opening Excel document");
    }
}

abstract class DocumentFactory {
    public abstract Document createDocument();
}

class WordFactory extends DocumentFactory {
    public Document createDocument() {
        return new Word();
    }
}

class PdfFactory extends DocumentFactory {
    public Document createDocument() {
        return new Pdf();
    }
}

class ExcelFactory extends DocumentFactory {
    public Document createDocument() {
        return new Excel();
    }
}

public class FactoryPattern {
    public static void main(String[] args) {
        DocumentFactory wordFactory = new WordFactory();
        Document doc1 = wordFactory.createDocument();
        doc1.open();

        DocumentFactory pdfFactory = new PdfFactory();
        Document doc2 = pdfFactory.createDocument();
        doc2.open();

        DocumentFactory excelFactory = new ExcelFactory();
        Document doc3 = excelFactory.createDocument();
        doc3.open();
    }
}