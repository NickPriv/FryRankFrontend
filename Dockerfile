FROM eclipse-temurin:17-jre-jammy
COPY out/artifacts/FryRank_jar/FryRank.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]