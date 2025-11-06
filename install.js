module.exports = {
  run: [{
    method: "shell.run",
    params: {
      path: "app",
        env: {
          UV_VENV_CLEAR: "1"
        },
      message: [
        "uv venv --relocatable --prompt invoke --python 3.12 --python-preference only-managed env",
      ]
    }
  }, {
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        venv: "env",
        path: "app"
      }
    }
  }, {
    method: "fs.link",
    params: {
      drive: {
        "models": "app/models",
        "databases": "app/databases",
        "autoimport": "app/autoimport",
        "outputs": "app/outputs",
        "nodes": "app/nodes",
        "text-inversion-output": "app/text-inversion-output",
        "text-inversion-training-data": "app/text-inversion-training-data"
      }
    }
  }, {
    method: "notify",
    params: {
      html: "App launched. Click 'start' to get started"
    }
  }]
}
