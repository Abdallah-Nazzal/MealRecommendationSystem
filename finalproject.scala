import org.apache.spark.sql.SQLContext
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.DataFrame
import com.mongodb.spark._
import org.apache.spark._
import org.apache.spark.sql._
import com.mongodb.spark.config._
import com.mongodb.spark.sql.toMongoDataFrameReaderFunctions
import org.apache.spark.sql.catalyst.ScalaReflection.universe.show
import org.apache.spark.sql.catalyst.dsl.expressions.{DslExpression, StringToAttributeConversionHelper}
import org.bson.Document

import scala.util.parsing.json.JSONObject
import org.apache.spark.sql.{DataFrame, Encoder}
import org.apache.spark.sql.functions.{col, collect_list, to_date, to_timestamp}
import org.apache.spark.sql.types.DateType
import org.mongodb.scala.model.geojson._
import org.mongodb.scala.model.Indexes
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model._
import org.mongodb.scala._


 object finalprojects{
    def main(args: Array[String]): Unit = {


//1.
      val spark = SparkSession
        .builder()
        .appName("finalproject")
        .master("local[*]")
        .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/org.spark")
        .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/org.spark")
        .getOrCreate()
      val sc = spark.sparkContext

      val path = "C:\\Users\\Asus\\IdeaProjects\\untitled3\\finalprojects\\src\\main\\scala\\final_data2.csv"
      val dataDF = spark
        .read
        .format("csv")
        .option("header", "true")
        .option("sep", ",")
        .option("inferSchema", "true")
        .load(path)
      println("hi")


     val readConfig=ReadConfig(Map("collection" -> "spark","readPreference.name" -> "secondaryPreferred"),Some(ReadConfig(sc)))

      import spark.implicits._

      val writeConfig = WriteConfig(Map("collection" -> "spark", "writeConcern.w" -> "majority"), Some(WriteConfig(sc)))

      val sparkDocuments = sc.parallelize((1 to 30000).map(i => Document.parse(s"{spark:$i }")))






      val dfFromCSV:DataFrame = spark.read.option("header",true)
        .csv("C:\\Users\\Asus\\IdeaProjects\\untitled3\\finalprojects\\src\\main\\scala\\final_data2.csv")
      dfFromCSV.printSchema()
      dfFromCSV.show(true)

      MongoSpark.save( sparkDocuments, writeConfig )


      println("please insert the  quntite ofingredients")
      val x = scala.io.StdIn.readInt()
      val y = scala.io.StdIn.readInt()
      val z = scala.io.StdIn.readInt()
      val n = scala.io.StdIn.readInt()
      val r = scala.io.StdIn.readInt()

      dfFromCSV.createOrReplaceTempView("final_data2")
      val qry = s"name from final_data2 where '${x}' = egg or'${y}'=milk_volume or'${z}'=butter_volume or'${n}'=white_sugar_volume or'${r}'=purpose_flour_volume;"
      spark.sql(qry).show(false)






    }
    }





