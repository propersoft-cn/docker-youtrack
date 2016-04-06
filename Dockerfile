FROM java:7
MAINTAINER Alpha Hinex <AlphaHinex@gmail.com>

RUN wget http://download-cf.jetbrains.com/charisma/youtrack-6.5.17057.jar -O youtrack.jar

EXPOSE 9001
CMD ["java", "-Xmx1g", "-XX:MaxPermSize=250m", "-Djava.awt.headless=true", "-jar", "youtrack.jar", "9001"]
