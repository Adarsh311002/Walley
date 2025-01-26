const healthCheck = async (req, res) => {
    try {
      return res.status(200).json({
        message: "Server is up and running",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server is down",
      });
    }
  };
  
  export { healthCheck };